import { useState, useEffect } from "react"

function MovieCard({movie, role}) {

    const [showDetails, setShowDetails] = useState(true)
    const [addRole, setAddRole] = useState(true)
    const [roles, setRoles] = useState([])
    const [newName, setNewName] = useState("")
    const [newGender, setNewGender] = useState("")
    const [newLead, setNewLead] = useState(false)
    // const [editFormVis, setEditFormVis] = useState(false)
    const [updateName, setUpdateName] = useState("")

    const {title, genre, id} = movie

    const randomActorId = Math.floor(Math.random() * (40 - 1 + 1) + 1 )

    useEffect(() => {
        fetch('http://localhost:9292/roles')
        .then(r => r.json())
        .then(roles => setRoles(roles))
      }, []);

    const movieRoles = roles.filter(role => (
        role.movie_id == id
      ))

    const actorNames = movieRoles.map(movieRole => (
        <li 
            className="actorList" 
            key={movieRole.id}
        >
            {movieRole.name}
            <button className="delete" id={movieRole.id} key={movieRole.id} onClick={handleDeleteName}>🐹</button>
            {/* <button id={movieRole.id} key={movieRole.name} onClick={handleEditName}>{editFormVis === false ? 'Edit' : 'Hide Form'}</button> */}
            <form id={movieRole.id} onSubmit={handleEditSubmit}>
                <li id={movieRole.id}>
                    <input
                        type="text"
                        placeholder={`Edit ${movieRole.name}`}
                        onChange={handleUpdateName}
                        id={movieRole.id}
                    />
                </li>
                <li>
                    <button type="submit">Submit Edit</button>
                </li>
            </form>
        </li>
      ))

    function handleDeleteName(e) {
        console.log(e.target.id)
        fetch(`http://localhost:9292/roles/${e.target.id}`, {
            method: "DELETE",
        })
        window.location.reload()

    }

    // const editForm =   
    //     <form onSubmit={handleEditSubmit}>
    //         <li>
    //             <input
    //                 type="text"
    //                 placeholder= 
    //                 onChange={handleUpdateName}
    //             />
    //         </li>
    //         <li>
    //             <button type="submit">Submit Edit</button>
    //         </li>
    //     </form>

    function handleEditSubmit(e) {
        e.preventDefault()
        console.log(`Clicked ${e.target.id}`)
        fetch(`http://localhost:9292/roles/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updateName,
          }),
        })
    }

    function handleUpdateName(e) {
        setUpdateName(e.target.value)
    }

    function handleDetails(e) {
        showDetails == true ? setShowDetails(false) : setShowDetails(true)
    }

    function handleRoleClick() {
        addRole == true ? setAddRole(false) : setAddRole(true)
    }

    function handleAddName(e) {
        setNewName(e.target.value)
    }

    function handleAddGender(e) {
        setNewGender(e.target.value)
    }

    function handleAddLead(e) {
        setNewLead(e.target.value)
    }

    function handleRoleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:9292/roles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                gender: newGender,
                lead: newLead,
                actor_id: randomActorId,
                movie_id: id
            }),
        })
            .then(r => r.json())
            .then(newRole => console.log(newRole))

            window.location.reload()
    }

    return (
        <div className="movieTile">
            <div>
                <h1>{title}</h1>
                <p>Genre: {genre}</p>
                <button id={id} onClick={handleDetails}>{showDetails ? 'Roles' : 'Hide Roles'}</button>
                <button onClick={handleRoleClick}>{addRole ? 'Add Role' : 'Hide Form'}</button>
                <div className="actorListContainer">
                    <ul>
                        {!showDetails ? actorNames : ""}
                    </ul>
                </div>
                <div>
                    {!addRole ?
                        <form  onSubmit={handleRoleSubmit}>
                            <ul>
                                <li>
                                    <input
                                        type="text"
                                        placeholder="Add Name"
                                        onChange={handleAddName}     
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        placeholder="Add Gender"
                                        onChange={handleAddGender}     
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        placeholder="Add Lead"
                                        onChange={handleAddLead}     
                                    />
                                </li>
                                <li>
                                    <button type="submit">Submit Form</button>
                                </li>
                            </ul>
                        </form>
                        :
                        ""
                    }
                </div>
                {/* <div>
                    {editFormVis ? editForm : "" }
                </div> */}
            </div>
        </div>
    )

}

export default MovieCard