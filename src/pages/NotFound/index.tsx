import React, { lazy } from "react";
const GridFullHeight = lazy(() => import("components/GridFullHeight"));
const GridFormContainer = lazy(() => import("components/GridFormContainer"));

const NotFoundPage = React.memo(props => {
  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight container>
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <div></div>
                <h1>404</h1>
              </div>
              <h2>Page not found</h2>
              <p>
                The page you are looking for might have been removed had its
                name changed or is temporarily unavailable.
              </p>
              <a href="/">home page</a>
            </div>
          </div>
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default NotFoundPage;
