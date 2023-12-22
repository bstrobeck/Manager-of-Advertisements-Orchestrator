// Notes: Any request coming from the front end, will get filtered through this router file.

import AdGroupBulkController from '../controllers/AdGroupBulkController';
import AdGroupController from '../controllers/AdGroupController';
import AdGroupKeywordController from '../controllers/AdGroupKeywordController';
import AdGroupNegativeKeywordController from '../controllers/AdGroupNegativeKeywordController';
import AdGroupNegativeTargetController from '../controllers/AdGroupNegativeTargetController';
import BudgetOptimizationSettingController from '../controllers/BudgetOptimizationSettingController';
import CampaignBudgetHistoryController from '../controllers/CampaignBudgetHistoryController';
import CampaignBulkController from '../controllers/CampaignBulkController';
import CampaignController from '../controllers/CampaignController';
import CampaignNegativeKeywordController from '../controllers/CampaignNegativeKeywordController';
import CampaignOutOfBudgetHistoryController from '../controllers/CampaignOutOfBudgetHistoryController';
import CampaignPerformanceController from '../controllers/reporting/CampaignPerformanceController';
import CampaignRebuildController from '../controllers/CampaignRebuildController';
import CampaignsByPrefixController from '../controllers/CampaignsByPrefixController';
import DashboardController from '../controllers/DashboardController';
import DayPartingHourlyPerformanceController from '../controllers/DayPartingHourlyPerformanceController';
import DayPartingRuleController from '../controllers/DayPartingRuleController';
import DayPartingRulesetController from '../controllers/DayPartingRulesetController';
import DayPartingScheduleController from '../controllers/DayPartingScheduleController';
import DayPartingValidationController from '../controllers/DayPartingValidationController';
import KeywordBidHistoryController from '../controllers/KeywordBidHistoryController';
import LinkedCampaignController from '../controllers/LinkedCampaignController';
import ListingsController from '../controllers/reporting/ListingsController';
import OptimizationAssignedRulesetController from '../controllers/OptimizationAssignedRulesetController';
import OptimizationRuleController from '../controllers/OptimizationRuleController';
import OptimizationRulesetController from '../controllers/OptimizationRulesetController';
import OptimizationSettingController from '../controllers/OptimizationSettingController';
import PendingCreationsController from '../controllers/PendingCreationsController';
import ProductAdController from '../controllers/ProductAdController';
import ProductController from '../controllers/ProductController';
import ProductNoAdController from '../controllers/ProductNoAdController';
import RetailClientController from '../controllers/reporting/RetailClientController';
import RetailListingsController from '../controllers/reporting/RetailListingsController';
import Router from 'lambda-framework/api/routing/Router';
import SearchTermHistoryController from '../controllers/SearchTermHistoryController';
import SearchTermRulesetController from '../controllers/SearchTermRulesetController';
import StatusController from 'lambda-framework/api/controllers/StatusController';
import SuggestedAdGroupKeywordController from '../controllers/SuggestedAdGroupKeywordController';
import TargetBidHistoryController from '../controllers/TargetBidHistoryController';
import TargetController from '../controllers/TargetController';
import UploadBucketController from '../controllers/UploadBucketController';

const routes: any = () => {
  const router = Router.getInstance();
  router.group('ad-group', [], () => {
    router.route('/', AdGroupController);
    router.route('bulk', AdGroupBulkController);
    router.group('keyword', [], () => {
      router.route('/', AdGroupKeywordController);
    });
    router.route('negative-keyword', AdGroupNegativeKeywordController);
    router.route('negative-target', AdGroupNegativeTargetController);
  });
  router.route('budget-optimization-settings', BudgetOptimizationSettingController);
  router.group('campaign', [], () => {
    router.route('/', CampaignController);
    router.route('budget-history', CampaignBudgetHistoryController);
    router.route('bulk', CampaignBulkController);
    router.route('negative-keyword', CampaignNegativeKeywordController);
    router.route('out-of-budget-history', CampaignOutOfBudgetHistoryController);
    router.route('rebuild', CampaignRebuildController);
  });
  router.route('campaigns-by-prefix', CampaignsByPrefixController);
  router.route('dashboard', DashboardController);
  router.group('day-parting', [], () => {
    router.route('hourly-performance', DayPartingHourlyPerformanceController);
    router.route('rule', DayPartingRuleController);
    router.route('ruleset', DayPartingRulesetController);
    router.route('schedule', DayPartingScheduleController);
    router.route('validation', DayPartingValidationController);
  });
  router.route('keyword-bid-history', KeywordBidHistoryController);
  router.route('linked-campaign', LinkedCampaignController);
  router.group('optimization', [], () => {
    router.route('rule', OptimizationRuleController);
    router.route('ruleset', OptimizationRulesetController);
    router.route('setting', OptimizationSettingController);
    router.route('assigned-ruleset', OptimizationAssignedRulesetController);
  });
  router.route('pending-creation', PendingCreationsController);
  router.group('product', [], () => {
    router.route('/', ProductController);
    router.route('ad', ProductAdController);
    router.route('no-ad', ProductNoAdController);
  });
  router.route('targets', TargetController);
  router.route('target-bid-history', TargetBidHistoryController);
};

export default routes;
