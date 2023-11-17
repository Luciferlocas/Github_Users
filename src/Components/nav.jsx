import github from '../assets/github.png'

export default function Nav(){
    return (
        <>
        <nav className='navbar'>
            <div className="logo">
                <img src={github} alt="Logo" />
            </div>
            <div className="name">Glitchub</div>
        </nav>
        </>
    );
}