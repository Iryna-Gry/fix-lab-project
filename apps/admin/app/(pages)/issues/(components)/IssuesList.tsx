import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import RemoveIssue from './RemoveIssue'

const IssuesList = ({
  issuesData,
}: {
  issuesData: Awaited<ReturnType<(typeof serverClient)['issues']['getAll']>>
}) => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <div className=' flex w-full flex-col items-center justify-center gap-8'>
        <ul className='flex w-full flex-col shadow-2xl'>
          {issuesData.map(
            (
              item: Awaited<
                ReturnType<(typeof serverClient)['issues']['getBySlug']>
              >,
            ) => (
              <li
                className='border-dark-blue bg-white-dis group border-b-[0.5px] opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
                key={item.id}
              >
                <div className='flex items-center justify-between px-6 py-[20px]'>
                  <h3 className='text-dark-blue font-semibold md:text-base xl:text-xl'>
                    {item.title}
                  </h3>
                  <div className='relative ml-4 flex items-center justify-center gap-4'>
                    <Link href={`/issues/${item.slug}`}>
                      <FaEdit
                        className='hover:fill-mid-green focus:fill-mid-green transition-colors'
                        size={30}
                      />
                    </Link>
                    <RemoveIssue item={item} />
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
        {/* {issuesData.totalPages > 1 && (
          <PaginationControls
            totalPages={issuesData.totalPages}
            currentPage={currentPage}
          />
        )} */}
      </div>
    </div>
  )
}

export default IssuesList