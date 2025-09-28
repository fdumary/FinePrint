import './App.css'

function Frontpage(){
    return(
        <div className="Frontpginsert">

            
            <div>
                <form onSubmit={handlesubmit}>
            <input name="Paste text here"/>
            <div></div>
            <input type="file"></input>
            <div></div>
            <input type='submit' />
            </form>
           </div>
        
        </div>
        
    )
}

export default Frontpage