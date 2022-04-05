import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Email from "./assets/Email";
import Location from "./assets/Location";
import Phone from "./assets/phone.svg";


function App() {
  const [veri, setVeri] = useState();
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const { data } = await axios.get("https://randomuser.me/api/");
    // console.log(data.results[0].picture.large);
    // console.log(data);
    setVeri(data.results[0]);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  // console.log(veri);
  return (
    <div className="main-card">
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
        <Card sx={{ maxWidth: 345 }} style={{backgroundColor:"#99D1DF"}}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[900] }}
                aria-label="recipe"
                src={veri?.picture.large}
              ></Avatar>
            }
            title={`${veri?.name.title} ${veri?.name.first} ${veri?.name.last}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" style={{marginBottom:".5rem"}}>
              <Email className="card-content"/>
              {veri?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{marginBottom:".5rem"}}>
              <img src={Phone} alt="" className="card-content" style={{ height: 25, width: 25 }} />
              {veri?.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{marginBottom:".5rem"}}>
              <Location className="card-content"/>
              {`${veri?.location.city} ${veri?.location.state} ${veri?.location.country}`}
            </Typography>
            <div style={{textAlign:"center",marginTop:"1rem"}}>
              <Typography variant="body2" color="text.secondary"  style={{marginBottom:"1rem"}}>
                Age: {veri?.dob.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Register Date: {veri?.dob.date}
              </Typography>
            </div>
          </CardContent>
          <div style={{textAlign:"center",marginBottom:"1rem"}}>
          <Button variant="contained" onClick={() => getUser()}>
            Random User
          </Button>
          </div>
        </Card>
        </div>
      ) }
    </div>
  );
}

export default App;
