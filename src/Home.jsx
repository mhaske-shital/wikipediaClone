import React,{useState} from 'react'

export default function Home() {
    const [search, setsearch] = useState("")
    const [results, setresults] = useState([])
    const [searchInfo, setsearchInfo] = useState({})

    const handleSearch=async(e)=>{
        e.preventDefault();
        if(search ==="") return;

        const endpoint=`https://en.wikipedia.org/w/api.php?action=query&list=search&
        prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

        const response=await fetch(endpoint);
        // console.log(response);
        if(!response.ok){
            throw Error(response.statusText);

        }
        const json = await response.json();
        console.log(json);
        setresults(json.query.search)
        setsearchInfo(json.query.searchinfo)
    }

  return (
    <div className="App">
    <header >
      <h1>Wiki Seeker</h1>
      <form className="search-box" onSubmit={handleSearch}>
      <input type="search" placeholder="what are lookking for"
       value={search}
       onChange={e=>setsearch(e.target.value)}
      />

      </form>
      {(searchInfo.totalhits) ?  <p>search result: {searchInfo.totalhits} </p> : " "}
     
    </header>
    <div className="results">
        {results.map((result,i)=>{
            const url=`https://en.wikipedia.org/?curid=${result.pageid}`
            return  <div className="result">
            <h3>{result.title}</h3>
            <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
            <a href={url} target="__blank" rel='nofollow'>Read more</a>
        </div>
        })}
       
    </div>
  </div>
  )
}
