import Home from '../home';

import Category from '../products/category';
import Product from '../products/product';

import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

import Store from '../store';

import User from '../user';
import Role from '../role';
import Auth from '../auth';
import Route from '../route';
import RouteDetail from '../route/detail';

import Markdown from '../comps/markdown';
import Richtext from '../comps/richtext';
import JsonEdit from '../comps/JsonEdit';

import Log from '../log';

export const rRoutes = {
  '/app/dashboard': Home,

  '/app/category': Category,
  '/app/product': Product,

  '/app/charts/bar': Bar,
  '/app/charts/line': Line,
  '/app/charts/pie': Pie,

  '/app/user': User,
  '/app/role': Role,
  '/app/auth': Auth,
  '/app/route': Route,
  '/app/route/:routeid': RouteDetail,

  '/app/store': Store,

  '/app/markdown': Markdown,
  '/app/richText': Richtext,
  '/app/jsonEdit': JsonEdit,

  '/app/log': Log
};
