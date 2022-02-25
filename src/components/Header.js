import './Header.css';
const Header = () => {
    return (
        <div><span onClick={()=>window.scroll(0,0)} className="header">🍿<span >Prime</span><span style={{color:"#FF0000"}}>Flix</span>👀📽</span></div>
    )
}

export default Header;