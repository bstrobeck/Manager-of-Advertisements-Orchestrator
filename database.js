// Note: This file helps to set up the database that will hold information for the application.
import AdGroup from '../database/models/AdGroup';
import AdGroupKeyword from '../database/models/AdGroupKeyword';
import AdGroupKeywordHourlyMetric from '../database/models/AdGroupKeywordHourlyMetric';
import AdGroupKeywordMetric from '../database/models/AdGroupKeywordMetric';
import AdGroupKeywordSearchTerm from '../database/models/AdGroupKeywordSearchTerm';
import AdGroupMetric from '../database/models/AdGroupMetric';
import AdGroupNegativeKeyword from '../database/models/AdGroupNegativeKeyword';
import AdGroupNegativeTargets from '../database/models/AdGroupNegativeTargets';
import BudgetOptimizationSetting from '../database/models/BudgetOptimizationSetting';
import Campaign from '../database/models/Campaign';
import CampaignBudgetHistory from '../database/models/CampaignBudgetHistory';
import CampaignCreative from '../database/models/CampaignCreative';
import CampaignMetric from '../database/models/CampaignMetric';
import CampaignNegativeKeyword from '../database/models/CampaignNegativeKeyword';
import CampaignOutOfBudgetHistory from '../database/models/CampaignOutOfBudgetHistory';
import CampaignPlacement from '../database/models/CampaignPlacement';
import Category from '../database/models/Category';
import ClientCampaigns from '../database/models/ClientCampaigns';
import DayPartingRule from '../database/models/DayPartingRule';
import DayPartingRuleset from '../database/models/DayPartingRuleset';
import KeywordBidHistory from '../database/models/KeywordBidHistory';
import LinkedCampaigns from '../database/models/LinkedCampaigns';
import OptimizationAssignedRuleset from '../database/models/OptimizationAssignedRuleset';
import OptimizationCondition from '../database/models/OptimizationCondition';
import OptimizationRule from '../database/models/OptimizationRule';
import OptimizationRuleset from '../database/models/OptimizationRuleset';
import OptimizationSchedule from '../database/models/OptimizationSchedule';
import OptimizationSetting from '../database/models/OptimizationSetting';
import PendingCreations from '../database/models/PendingCreations';
import Product from '../database/models/Product';
import ProductAd from '../database/models/ProductAd';
import ProductAdMetric from '../database/models/ProductAdMetric';
import SearchTermCondition from '../database/models/SearchTermCondition';
import SearchTermHistory from '../database/models/SearchTermHistory';
import SearchTermRule from '../database/models/SearchTermRule';
import SearchTermRuleset from '../database/models/SearchTermRuleset';
import SuggestedAdGroupKeyword from '../database/models/SuggestedAdGroupKeyword';
import Target from '../database/models/Target';
import TargetBidHistory from '../database/models/TargetBidHistory';
import TargetHourlyMetric from '../database/models/TargetHourlyMetric';
import TargetMetrics from '../database/models/TargetMetrics';
import TargetSearchTerm from '../database/models/TargetSearchTerm';
import { config } from '../config/database';
import { getSequelize } from './app';
import { isTest } from '../modules/helpers/general';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

export const bootstrap = (dbConfig: any): Sequelize => {
  const options: SequelizeOptions = {
    dialectOptions: { decimalNumbers: true },
    database: config.database,
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    modelPaths: config.modelPaths,
    operatorsAliases: config.operatorsAliases,
    password: config.password,
    username: config.username,
    logging: config.logging,
    ...dbConfig,
  };

  let sequelize = getSequelize();
  if (!isTest() || !sequelize) {
    sequelize = new Sequelize(options);
    sequelize.addModels([
      AdGroup,
      AdGroupKeyword,
      AdGroupKeywordHourlyMetric,
      AdGroupKeywordMetric,
      AdGroupKeywordSearchTerm,
      AdGroupMetric,
      AdGroupNegativeKeyword,
      AdGroupNegativeTargets,
      BudgetOptimizationSetting,
      Campaign,
      CampaignBudgetHistory,
      CampaignCreative,
      CampaignMetric,
      CampaignNegativeKeyword,
      CampaignOutOfBudgetHistory,
      CampaignPlacement,
      Category,
      ClientCampaigns,
      DayPartingRule,
      DayPartingRuleset,
      KeywordBidHistory,
      LinkedCampaigns,
      OptimizationAssignedRuleset,
      OptimizationCondition,
      OptimizationSchedule,
      OptimizationRule,
      OptimizationRuleset,
      OptimizationSetting,
      PendingCreations,
      Product,
      ProductAd,
      ProductAdMetric,
      PendingCreations,
      SearchTermCondition,
      SearchTermHistory,
      SearchTermRule,
      SearchTermRuleset,
      SuggestedAdGroupKeyword,
      Target,
      TargetBidHistory,
      TargetHourlyMetric,
      TargetMetrics,
      TargetSearchTerm,
    ]);
  }

  return sequelize;
};
