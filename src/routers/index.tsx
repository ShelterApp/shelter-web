import React, { Suspense } from "react";
import GridFullHeight from "components/GridFullHeight";
import { Route, Switch } from "react-router";
import { reducerType } from "redux/reducers";
import { connect } from "react-redux";
import loading from "asset/img/loading.svg";
import ServiceDetail from "pages/ServiceDetail";
import MyFavorites from "pages/MyFavorites";
import CrisisLines from "pages/CrisisLines";
import Introduce from "pages/Introduce";
import PrivacyPolicy from "pages/PrivacyPolicy";
import TermsOfUse from "pages/TermsOfUse";
import About from "pages/About";
import Feedback from "pages/Feedback";
import Login from "pages/Auth";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import HomePage from "pages/HomePage";
import OnlyPublicRoute from "./OnlyPublic";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NotFoundPage from "pages/NotFound";
import ChangePassword from "pages/ChangePassword";
import NewService from "pages/NewService";
import ManageServices from "pages/ManageServices";
import EditService from "pages/EditService";
import CrisisLinesNew from "pages/CrisisLines/create";
import CrisisLinesEdit from "pages/CrisisLines/edit";
import Feedbacks from "pages/Feedbacks";
import AvailableBeds from "pages/AvailableBeds";
import CallbackPage from "pages/Callback";
import ManageApprovals from "pages/ManageApprovals";
// import ManageAccess from "pages/ManageAccess";
import ManageUsers from "pages/ManageUsers";
import UpdateProfile from "pages/UpdateProfile";
// import ManagerSuperUsers from "pages/ManagerSuperUsers";
import ChatBox from "pages/ChatBox";
import UpdateMyProfile from "pages/UpdateMyProfile";

const mapStateToProps = (state: reducerType) => ({ auth: state.auth });

type RoutesProps = ReturnType<typeof mapStateToProps>;

const Routes = (props: RoutesProps) => (
  <Suspense
    fallback={
      <GridFullHeight
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <img width={50} height={50} src={loading} alt="loading" />
      </GridFullHeight>
    }
  >
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/services/:id" component={ServiceDetail} />
      <Route exact path="/my_favorites" component={MyFavorites} />
      <Route exact path="/crisis_lines" component={CrisisLines} />
      <Route exact path="/introduce" component={Introduce} />
      <Route exact path="/privacy_policy" component={PrivacyPolicy} />
      <Route exact path="/terms_of_use" component={TermsOfUse} />
      <Route exact path="/about" component={About} />
      <Route exact path="/feedback" component={Feedback} />
      <Route exact path="/forgot_password" component={ForgotPassword} />
      <Route exact path="/auth/resetPassword" component={ResetPassword} />
      <Route exact path="/auth/twitter/callback" component={CallbackPage} />
      <Route exact path="/chatbot" component={ChatBox} />
      <OnlyPublicRoute
        path={"/login"}
        component={Login}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path={"/add_service"}
        component={NewService}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path={"/manage_services"}
        component={ManageServices}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path={"/services/:id/edit"}
        component={EditService}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path={"/change_password"}
        component={ChangePassword}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <AdminRoute
        path={"/crisis_lines/new"}
        component={CrisisLinesNew}
        isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <AdminRoute
        path={"/crisis_lines/:id/edit"}
        component={CrisisLinesEdit}
        isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path="/feedbacks"
        component={Feedbacks}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path="/available_beds"
        component={AvailableBeds}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path="/manage_approvals"
        component={ManageApprovals}
        isLoggedIn={true}
      />
      {
        // <AdminRoute
        //   path={"/manage_access"}
        //   component={ManageAccess}
        //   isAdmin={Boolean(props.auth.current_user.isAdmin)}
        //   isLoggedIn={Boolean(props.auth.current_user.isLogin)}
        // />
        // <AdminRoute
        //   path={"/manage_superusers"}
        //   component={ManagerSuperUsers}
        //   isAdmin={Boolean(props.auth.current_user.isAdmin)}
        //   isLoggedIn={Boolean(props.auth.current_user.isLogin)}
        // />
      }
      <AdminRoute
        path={"/manage_users"}
        component={ManageUsers}
        isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <AdminRoute
        path={"/users/:id"}
        component={UpdateProfile}
        isAdmin={Boolean(props.auth.current_user.isAdmin)}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <PrivateRoute
        path={"/update_profile"}
        component={UpdateMyProfile}
        isLoggedIn={Boolean(props.auth.current_user.isLogin)}
      />
      <Route path="*" exact={true} component={NotFoundPage} />
    </Switch>
  </Suspense>
);

export default connect(mapStateToProps)(Routes);
