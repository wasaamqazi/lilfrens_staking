import { useState } from "react";
import { useRouter } from 'next/router';
import { styled as muiStyled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useWeb3React } from '@web3-react/core';
import { abridgeAddress, injected, useENSName, walletConnect, walletlink } from '../../pages/utils/_web3';
import ConnectModal from "../../components/web3/connectModal";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from "@mui/material";

export default function Connect() {
  const { activate, deactivate, chainId, active, account, library } = useWeb3React();
  const router = useRouter();

  // for the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const walletConnectConnector = walletConnect;
  const handleClose = () => setIsModalVisible(false);
  const handleConnect = () => {
    setIsModalVisible(true);
    handleMenuClose();
  };

  // for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBodyScroll = () => {
    document.body.style.overflow = 'visible';
  }

  const handleLoginClick = async (type) => {
    if (type === 'coinbase') {
      await activate(walletlink);
    } else if (type === 'metamask') {
      if(window.ethereum) {
        await activate(injected);
      }
      else if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.location = "https://metamask.app.link/dapp/lilfrens.xyz/mint"
      }
    } else {
      await activate(walletConnectConnector);
    }
    handleBodyScroll();
    handleClose();
  }

  const goToWallet = async () => {
    router.push('/wallet');
  }

  const handleDisconnect = async () => {
    await deactivate();
  }

  const ENSName = useENSName(library, account);

  return (
    <Box sx={{textAlign: 'center'}}>
    {!active ? (
      <button variant="contained"
        disableElevation
        onClick={handleConnect}
        className="connectWallet"
      >
        Connect Wallet
      </button>
      ) :
    <div>
      <button
        variant="contained"
        onClick={handleMenuClick}
        disableElevation
        endIcon={<KeyboardArrowDownIcon />}
        className="connectWallet"
      >
        {account && (ENSName || abridgeAddress(account))}
      </button>
      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          variant="contained"
          onClick={handleDisconnect}
        >
          Disconnect
        </MenuItem>
      </CustomMenu>
    </div>
    }
    <ConnectModal
      isModalVisible={isModalVisible}
      handleLoginClick={handleLoginClick}
      handleClose={handleClose}
    />
    </ Box>
  )
}

const CustomMenu = muiStyled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(0.5),
    minWidth: 180,
    color: theme.palette.primary,
    background: theme.palette.primary.light,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      color: 'white',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.primary.light,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.light,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
