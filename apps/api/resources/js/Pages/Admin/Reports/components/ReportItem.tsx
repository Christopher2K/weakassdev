import React from 'react';
import { Link } from '@inertiajs/inertia-react';

import type { AdminReportsData } from '@weakassdev/shared/validators';
import { formatDate } from '@weakassdev/shared/utils';
import { css } from '@style/css';
import { hstack, vstack } from '@style/patterns';

import { Button, DefinitionList } from '~/Components';

export type ReportItemProps = {
  report: AdminReportsData['data'][number];
};

export function ReportItem({ report }: ReportItemProps) {
  return (
    <div
      key={report.id}
      className={vstack({
        width: 'full',
        gap: '3',
        bg: 'slate.100',
        px: 4,
        py: 5,
        borderRadius: 'md',
      })}
    >
      <div
        className={vstack({
          gap: '3',
          w: 'full',
          alignItems: 'stretch',
        })}
      >
        <p
          className={css({
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'gray.600',
          })}
        >
          Reported by{' '}
          <Link href={`/admin/users/${report.reporter.id}`}>{report.reporter.username}</Link>, on{' '}
          {formatDate(report.createdAt)}
        </p>
        <DefinitionList
          items={[
            ['Reason', report.reason],
            ['Context', report.reasonContext],
          ]}
        />
      </div>

      <div className={vstack({ w: 'full', gap: '1', alignItems: 'stretch' })}>
        <blockquote
          className={css({
            borderLeftWidth: 4,
            borderLeftColor: 'gray.800',
            fontStyle: 'italic',
            pl: '5',
            py: '2',
          })}
        >
          {report.post.content.content}
        </blockquote>
        <p
          className={css({
            fontStyle: 'italic',
            fontSize: 'sm',
            color: 'gray.600',
          })}
        >
          Posted by{' '}
          <Link href={`/admin/users/${report.post.author.id}`}>{report.post.author.username}</Link>
          on {formatDate(report.post.createdAt)}
        </p>
      </div>

      <div
        className={vstack({
          w: 'full',
          gap: '2',
        })}
      >
        <div
          className={hstack({
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            gap: '5',
            w: 'full',
          })}
        >
          <Button.Link href={`/admin/reports/${report.id}/approve`}>Approve report</Button.Link>
          <Button.Link href={`/admin/reports/${report.id}/reject`}>Reject report</Button.Link>
        </div>
      </div>
    </div>
  );
}
