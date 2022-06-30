import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'

export default function globDirectives(app) {
  app.directive('hasRole', hasRole)
  app.directive('hasPermi', hasPermi)
}
