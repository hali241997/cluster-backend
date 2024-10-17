/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ClustersController = () => import('#controllers/clusters_controller')
const PoliciesController = () => import('#controllers/policies_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('getTimeSeries', [ClustersController, 'show'])
    router.get('getPolicy', [PoliciesController, 'index'])
    router.put('setPolicy', [PoliciesController, 'update'])
  })
  .prefix('api')
