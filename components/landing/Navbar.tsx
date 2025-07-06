// components/landing/Navbar.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { isAdmin } from '../../utils/roleUtils';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    router.push('/');
  };

  const menuLinks = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Topics', href: '/#topics' },
    { label: 'Demo', href: '/#demo' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Newsletter', href: '/#newsletter' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        EdgeMind Studio
      </Typography>
      <Divider />
      <List>
        {menuLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => router.push(item.href)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push('/dashboard')}>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push('/profile')}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push('/my-courses')}>
                <ListItemText primary="My Courses" />
              </ListItemButton>
            </ListItem>
            {isAdmin(user?.role) && (
              <>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={() => router.push('/admin-dashboard')}>
                    <ListItemText primary="Admin Panel" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => router.push('/courses/create')}>
                    <ListItemText primary="Add Course" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push('/login')}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push('/register')}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo with Image */}
          <Link href="/" passHref>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: 1 }}>
              <Image
                src="/logos/Logo-transparency.png"
                alt="EdgeMind Studio Logo"
                width={40}
                height={40}
                priority
                style={{ borderRadius: 4, objectFit: 'cover' }}
              />
            </Box>
          </Link>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuLinks.map((item) => {
              const isActive = router.asPath === item.href || router.asPath.startsWith(item.href);
              return (
                <Link key={item.label} href={item.href} passHref>
                  <Button
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      color: isActive ? 'primary.main' : 'inherit',
                      borderBottom: isActive ? '2px solid' : 'none',
                      borderColor: isActive ? 'primary.main' : 'transparent',
                      transition: 'color 0.2s, border-color 0.2s',
                      '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </Box>

          {/* User Icon & Menu */}
          {user ? (
            <>
              <IconButton
                onClick={handleUserMenuClick}
                color="inherit"
                sx={{
                  ml: 2,
                  transition: 'background-color 0.2s',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => { router.push('/dashboard'); handleUserMenuClose(); }}>Dashboard</MenuItem>
                <MenuItem onClick={() => { router.push('/profile'); handleUserMenuClose(); }}>Profile</MenuItem>
                <MenuItem onClick={() => { router.push('/my-courses'); handleUserMenuClose(); }}>My Courses</MenuItem>
                {isAdmin(user?.role) && (
                  <>
                    <Divider />
                    <MenuItem onClick={() => { router.push('/admin-dashboard'); handleUserMenuClose(); }}>Admin Panel</MenuItem>
                    <MenuItem onClick={() => { router.push('/courses/create'); handleUserMenuClose(); }}>Add Course</MenuItem>
                  </>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 2 }}>
              <Link href="/login" passHref>
                <Button color="primary" variant="outlined">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button color="primary" variant="contained">Register</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
