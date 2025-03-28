import React, { memo } from 'react';
import { PageTitle, TemplateFileAware } from '@shared/ui';

import Price from './Price/Price.component';
import { description, heading } from './PurchasePage.data';

const PurchasePage: React.FC = () => (
  <>
    <PageTitle
      heading={heading}
      subHeading={
        <TemplateFileAware
          description={description.descr}
          path={description.path}
          name={description.name}
        />
      }
    />
    <Price />
  </>
);

export default memo(PurchasePage);
