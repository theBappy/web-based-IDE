import EmptyState from '@/components/empty-state'
import { deleteProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from '@/features/dashboard/actions'
import AddNewButton from '@/features/dashboard/components/add-new-button'
import AddRepoButton from '@/features/dashboard/components/add-repo-button'
import { ProjectTable } from '@/features/dashboard/components/project-table'



const DashboardPage = async() => {
  const playgrounds = await getAllPlaygroundForUser()


  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
            <AddNewButton />
            <AddRepoButton />
        </div>
        <div className="mt-1 flex flex-col justify-center items-center w-full">
            {playgrounds && playgrounds.length === 0 ? (
                <EmptyState title="No projects found" description='Create a new project to get started' imageSrc='/emptyState.svg' />
            ): (
                // TODO: add playground table
                <ProjectTable
                // @ts-ignore
                //TODO: need to update the types of playground
                projects={playgrounds || []}
                onDeleteProject={deleteProjectById}
                onUpdateProject={editProjectById}
                onDuplicateProject={duplicateProjectById}
                />
            )}
        </div>
    </div>
  )
}

export default DashboardPage