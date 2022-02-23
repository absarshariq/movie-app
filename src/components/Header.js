import './Header.css';
const Header = () => {
    return (
        <div><span onClick={()=>window.scroll(0,0)} className="header">🍿<span style={{color:"#FF0000 "}}>Movies</span> Hub👀📽</span></div>
    )
}

export default Header;