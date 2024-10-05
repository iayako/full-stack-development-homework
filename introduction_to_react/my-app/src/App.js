import logo from './logo.svg';
import './App.css';
import {Button} from './components/button';

function App() {
  const menu = [
    {
      name: 'Buuza',
      image: 'https://s1.eda.ru/StaticContent/Photos/140124100744/140131144235/p_O.jpg',
    },
    {
      name: 'Wok',
      image: 'https://www.tenno-sushi.ru/uploads/images/U3e3jO1PnkXeEqWEbth2lLh3Hge3r8hS.jpg',
    },
    {
      name: 'Pizza',
      image: 'https://png.pngtree.com/thumb_back/fw800/background/20230902/pngtree-pizza-on-a-white-background-with-one-slice-cut-off-image_13157037.jpg',
    },
  ];
  return (
    <div className="App">
      <h1>Меню</h1>
      <div className="menu">
        {menu.map(function(item) {
          return (
            <div className="card">
              <img src={item.image} alt={item.name}/>
              <h2>{item.name}</h2>
            </div>
          );
        })}
      </div>
      <Button text="Отмена" style={{backgroundColor: 'red'}}/>
      <Button/>
    </div>
  );
}

export default App;
