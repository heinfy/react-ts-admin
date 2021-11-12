import Home from '../home';
import Category from '../products/category';
import Product from '../products/product';
import User from '../user';
import Auth from '../auth';
import Route from '../route';
import RouteDetail from '../route/detail';
import Role from '../role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Store from '../store';
import Log from '../log';

export const rRoutes = {
  '/app/dashboard': Home,
  '/app/category': Category,
  '/app/product': Product,
  '/app/user': User,
  '/app/auth': Auth,
  '/app/route': Route,
  '/app/route/:routeid': RouteDetail,
  '/app/role': Role,
  '/app/charts/bar': Bar,
  '/app/charts/line': Line,
  '/app/charts/pie': Pie,
  '/app/store': Store,
  '/app/log': Log
};
