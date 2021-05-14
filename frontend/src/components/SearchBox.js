import React, { useState } from 'react';

const SearchBox = (props) => {
    const [name, setName] = useState('');

    const submitDo = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    }

    return (
        <div>
            <form className="search-input" onSubmit={submitDo}>
                <div className="search-flex">
                    <input className="form-control" type="text" name="q" id="q" placeholder="Поиск" onChange={(e) => setName(e.target.value)}></input>
                    <button className="searching" type="submit">s</button>
                </div>
                
            </form>
        </div>
    );
};

export default SearchBox;