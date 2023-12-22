// Notes: If the front end makes a request for AdGroup information, the router file would route to here. Depending on the Request type (get, post, put, delete), the subsequent functions would then be called.

import AbstractHttpRequestController from 'lambda-framework/api/controllers/AbstractHttpRequestController';
import httpStatusCodes from 'http-status-codes';
import IAdGroupGetRequest from './request/adGroups/IAdGroupGetRequest';
import IAdGroupPutRequest from './request/adGroups/IAdGroupPutRequest';
import ICreateAdGroupMachineRequest from '../interfaces/adGroups/ICreateAdGroupMachineRequest';
import JsonHttpResponse from 'lambda-framework/api/objects/JsonHttpResponse';
import Log from 'lambda-framework/Log';
import {
  archiveAdGroups,
  getAdGroup,
  getAdGroups,
  updateAdGroups,
} from '../modules/adGroup';
import { parseQueryStringParams, parseRequestBody, validateMarketplaceInput } from '../modules/helpers/api';
import { startCreateAdGroupStateMachine } from '../jobs/adGroups/createStateMachine/startCreateAdGroupsStateMachine';

export default class AdGroupController extends AbstractHttpRequestController {
  public async get(): Promise<JsonHttpResponse> {
    const parameters: IAdGroupGetRequest = parseQueryStringParams<IAdGroupGetRequest>(this.event);
    const { adGroupId } = parameters;
    const batchSize: number = Number(process.env.AD_GROUP_GET_BATCH_SIZE || 10000);
    let response: JsonHttpResponse;

    let result;
    if (adGroupId) {
      result = await getAdGroup(parameters);
      response = new JsonHttpResponse(httpStatusCodes.OK, { data: result });
    } else {
      result = await getAdGroups(parameters, batchSize);
      const { count, data } = result;
      response = new JsonHttpResponse(
        httpStatusCodes.OK,
        {
          data,
          count,
          batchSize,
          index: Number(parameters.index) + batchSize,
        },
      );
    }

    return response;
  }

  public async post(): Promise<JsonHttpResponse> {
    let statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    let message: string;

    try {
      const body = parseRequestBody<ICreateAdGroupMachineRequest>(this.event);
      const invalidMarketplace = validateMarketplaceInput(body.marketplaceId);

      if (invalidMarketplace) {
        statusCode = invalidMarketplace.statusCode;
        message = invalidMarketplace.data.message;
      } else {
        await startCreateAdGroupStateMachine(body);

        statusCode = httpStatusCodes.OK;
        message = 'Ad Groups are being created.';
      }
    } catch (error) {
      Log.error(error);
      message = error.message;
    }

    return new JsonHttpResponse(statusCode, message);
  }

  public async put(): Promise<JsonHttpResponse> {
    const adGroups = parseRequestBody<IAdGroupPutRequest[]>(this.event);

    const response = await updateAdGroups(adGroups);

    return new JsonHttpResponse(httpStatusCodes.OK, response);
  }

  public async delete(): Promise<JsonHttpResponse> {
    const adGroupIds = parseRequestBody<string[]>(this.event);

    const response = await archiveAdGroups(adGroupIds);

    return new JsonHttpResponse(httpStatusCodes.OK, response);
  }
}
