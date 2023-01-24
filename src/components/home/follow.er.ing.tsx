import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserInterfaceHeader from "./reusable/interface.header";
import UserInterfaceSearch from "./reusable/interface.search";

export default function Foll() {
  if (localStorage.getItem("dark") !== null) {
    document.body.style.backgroundColor = "rgb(5, 9, 12)";
  }
  const { id } = useParams();
  const navegate = useNavigate();

  const photo = require("../main/user.1.png");

  const [info, setinfo] = useState<any>([]);
  const [state, setstate] = useState<any>([]);

  const [select, setselect] = useState<number>(0);



  useEffect(() => {
    fetch(`https://project-0-1.herokuapp.com/users/followers/ing/${id}`)
    .then((res) => res.json())
    .then((res) => {
      if (res[0].state === "error"){navegate(`/.user/${localStorage.getItem("token")}`)}
      else
      {let number: any = localStorage.getItem("key");
      setinfo(res);
      setstate(res[parseInt(number)]);
      setselect(parseInt(number));}
    });
  },[]);

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if (token === "" || token === undefined || token === null){navegate("/")}
  })


  return (
    <Grid
      container
      sx={{ height: { xs: "98vh", md: "" } }}
      className={localStorage.getItem("dark") === null ? "" : "dark"}
    >
      <UserInterfaceHeader />
      <Grid
        item
        container
        xs={11}
        md={6}
        sx={{
          borderLeft: "1px rgb(150,150,150) solid",
          borderBottom: { md: "1px rgb(150,150,150) solid" },
        }}
      >
        <Grid className={localStorage.getItem("dark") === null ? "" : "dark-follow"}
          borderBottom={select === 0 ? "rgb(52, 132, 236) 2px solid" : ""}
          sx={{
            height: "30px",
            "&:hover": {
              bgcolor: "rgb(233,233,233)",
              borderBottom: "1px rgb(0,0,0) solid",
              cursor: "pointer",
            },
          }}
          textAlign="center"
          item
          xs={5.5}
          md={6}
        >
          <Typography
            component="p"
            color="initial"
            onClick={() => {
              setstate(info[0]);
              setselect(0);
            }}
            fontWeight={600}
          >
            {localStorage.getItem("idiom") === null
              ? "Followers"
              : "Seguidores"}
          </Typography>
        </Grid>
        <Grid className={localStorage.getItem("dark") === null ? "" : "dark-follow"}
          onClick={() => {
            setstate(info[1]);
            setselect(1);
          }}
          borderBottom={select === 1 ? "rgb(52, 132, 236) 2px solid" : ""}
          sx={{
            height: "30px",
            "&:hover": {
              bgcolor: "rgb(233,233,233)",
              borderBottom: "1px rgb(0,0,0) solid",
              cursor: "pointer",
            },
          }}
          textAlign="center"
          item
          xs={5.5}
          md={6}
        >
          <Typography component="p" color="initial" fontWeight={600}>
            {localStorage.getItem("idiom") === null ? "Following" : "Siguiendo"}
          </Typography>
        </Grid>

        {state.map((stat: any) => {
          return (
            <Box
              onClick={() => {
                navegate(`/.user/${stat.id}`);
              }}
              key={stat.id}
              width="100%"
              ml={1}
              mb={2}
            >
              <Grid
                borderRadius="2%"
                sx={{
                  "&:hover": {
                    bgcolor: "rgb(244,244,244)",
                    cursor: "pointer",
                    borderBottom: "1px rgb(0,0,0) solid",
                  },
                }}
                item
              >
                <Box
                  sx={{ marginLeft: { xs: "20px", md: "0px" } }}
                  width={55}
                  height={55}
                >
                  <img
                    className="img"
                    alt="User"
                    src={
                      stat.imgData === null
                        ? photo
                        : `https://project-0-1.herokuapp.com/${stat.id}-img.png`
                    }
                  />
                </Box>
              </Grid>
              <Grid
                item
                position="absolute"
                ml="24%"
                sx={{
                  transform: {
                    md: "translateY(-155%)",
                    xs: "translateY(-160%)",
                  },
                }}
                xs={12}
              >
                <Typography
                  sx={{ fontSize: { xs: "18px" } }}
                  component="p"
                  color="initial"
                >
                  {stat.name}
                </Typography>
              </Grid>
            </Box>
          );
        })}
      </Grid>

      <UserInterfaceSearch />
    </Grid>
  );
}
