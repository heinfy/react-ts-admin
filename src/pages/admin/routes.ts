import Home from '../home';
import Category from '../products/category';
import Product from '../products/product';
import User from '../user';
import Role from '../role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Store from '../store';

export const rRoutes = {
  '/app/dashboard': Home,
  '/app/category': Category,
  '/app/product': Product,
  '/app/user': User,
  '/app/auth': User,
  '/app/role': Role,
  '/app/charts/bar': Bar,
  '/app/charts/line': Line,
  '/app/charts/pie': Pie,
  '/app/store': Store,
  '/app/log': Pie
};
