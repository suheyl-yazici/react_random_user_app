import "./App.css";
import Assets from "./assets/Assets";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';


function App() {
  const [veri, setVeri] = useState();
  const [loading, setLoading] = useState(false);


  const getUser = async () => {
    setLoading(true);
    const { data } = await axios.get("https://randomuser.me/api/");
    /* console.log(data.results[0].picture.large); */
    // console.log(data);
    setVeri(data.results[0]);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(veri);
  return (
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={veri?.picture.large}></Avatar>
        }
        title={`${veri?.name.title} ${veri?.name.first} ${veri?.name.last}`}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          email:
          {veri?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          phoneNumber:
          {veri?.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address:
            {`${veri?.location.city} ${veri?.location.state} ${veri?.location.country}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {veri?.dob.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {veri?.dob.date}
        </Typography>
      </CardContent>
      <Button variant="contained" onClick={() => getUser()} >Contained</Button>
    </Card>
        )
      }
      
      
      </div>
  );
}

export default App;
