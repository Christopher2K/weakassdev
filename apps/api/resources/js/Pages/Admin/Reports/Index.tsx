import React from 'react';

import { AdminReportsData } from '@weakassdev/shared/validators';
import { css } from '@style/css';
import { vstack } from '@style/patterns';

import { Layout } from '~/Pages/Layout';
import { Pagination } from '~/Components';

import { ReportItem } from './components/ReportItem';

type IndexProps = {
  reports: AdminReportsData;
};

export default function Index({ reports }: IndexProps) {
  return (
    <>
      <h1 className={css({ textStyle: 'h2', mb: '10' })}>Reports</h1>
      <div
        className={vstack({
          alignItems: 'flex-start',
          width: 'full',
          gap: '3',
        })}
      >
        {reports.data.map((report) => (
          <ReportItem key={report.id} report={report} />
        ))}
        {reports.data.length > 0 && (
          <Pagination
            as="footer"
            baseUrl="/admin/reports"
            currentPage={reports.meta.currentPage}
            lastPage={reports.meta.lastPage}
          />
        )}
      </div>
    </>
  );
}

Index.layout = (page: JSX.Element) => <Layout children={page} />;
