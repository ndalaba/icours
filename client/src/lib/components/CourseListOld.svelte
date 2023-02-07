{#if loading}
    <ListPlaceholder/>
{:else}
    {#each filteredCourses as course }
        <div class="col-lg-3 mb-3">
            <div class="card project-box">
                <div class="card-body" style="padding: 15px;background-image: url('/img/bg.svg')">
                    <div class="dropdown float-end">
                        <a aria-expanded="false" class="dropdown-toggle card-drop arrow-none" data-bs-toggle="dropdown" href="#">
                            <i class="mdi mdi-dots-horizontal m-0 text-muted h3"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href={`/admin/courses/edit-${course.uid}`}>Modifier</a>
                            <a class="dropdown-item text-danger" on:click|preventDefault={()=>deleteCourse(course.uid)}>Supprimer</a>
                        </div>
                    </div>
                    <h2 class="mt-0" style="height: 85px">
                        <a href={`/admin/courses/${course.uid}`} class="text-black-gray">{course.title}</a>
                    </h2>
                    <p class="text-muted text-uppercase">
                        <i class="mdi mdi-account-circle"></i>
                        <strong>{course.subject?.name}</strong>
                        <span style="float: right" class={`badge ${course.published ? 'bg-teal' : 'bg-danger'}`}>{course.published ? 'Publié' : 'Brouillon'}</span>
                    </p>
                    {#each course.classes as classe}
                        <span class="badge bg-blue m-1">{classe.name}</span>
                    {/each}
                </div>
            </div> <!-- end card box-->
        </div><!-- end col-->
    {/each}
{/if}