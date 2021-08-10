import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Dialog } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import UserRoleDialog from "../UserRole/dialogForm";
import RatingRoleDialog from "../RatingRole/dialogForm";
import { useAuth } from "../../hooks/Auth";
import CompanyRoleDialog from "../CompanyRole/dialogForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ProfileProps {
  hide: any;
}

const Profile: React.FC<ProfileProps> = ({ hide }) => {
  const [value, setValue] = React.useState(0);
  const { user } = useAuth();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"md"}
    >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Usuário" {...a11yProps(0)} />
          {user.access_level !== 1 && (
            <Tab
              label={user.access_level === 3 ? "Avaliações" : "Empresa"}
              {...a11yProps(1)}
            />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UserRoleDialog hide={hide} />
      </TabPanel>
      {user.access_level !== 1 && (
        <TabPanel value={value} index={1}>
          {user.access_level === 3 ? (
            <RatingRoleDialog hide={hide} />
          ) : (
            <CompanyRoleDialog hide={hide} />
          )}
        </TabPanel>
      )}
    </Dialog>
  );
};

export default Profile;
