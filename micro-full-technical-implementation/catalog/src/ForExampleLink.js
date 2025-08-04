import {Link as RouterLink, useLocation} from 'react-router-dom';
import React, {useMemo} from "react";

const ForExampleLink = React.forwardRef((props, ref) => {
  const location = useLocation();

  const toUrl = useMemo(() => {
    if (location.pathname.startsWith('/catalog')) {// لغايات المثال قمنا بوضع ال path بشكل static
      return `/catalog${props.to}`;
    }

    return props.to;
  }, [location.pathname]);

  return <RouterLink ref={ref} {...props} to={toUrl} />;
});

export default ForExampleLink;