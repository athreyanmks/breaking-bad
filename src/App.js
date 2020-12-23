import logo from './logo.svg';
import './App.css';
import Mainpage from './Components/Main_page'

function App() {
  return ( 
  <div>
    
    <div className = 'container'>
    <div className="jumbotron">
      {/* <img src ='https://www.wallpapertip.com/wmimgs/3-37776_breaking-bad-wallpaper.jpg'>

      </img> */}
      <div className = 'row'>
        <div className = 'col-sm-3'><img src = 'https://fanart.tv/fanart/tv/81189/hdtvlogo/breaking-bad-503d6f03d4bfe.png' className='img-responsive'></img></div>
        <div className = 'col-sm-9'></div>
      </div>
           
    </div>
      <Mainpage/>
    </div>
  </div>
  );
}

export default App;
