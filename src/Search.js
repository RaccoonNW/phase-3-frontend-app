import { useState } from "react"

function Search() {

    const [search, setSearch] = useState('')

    function handleSearch(e) {
        setSearch(e.target.value)
        console.log(e.target.value)
    }


    return(
        <form>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
            />
            <input
                type="text"
                placeholder="Add Role"
                value={search}
                onChange={handleSearch}
            />

        </form>
    )
}

export default Search