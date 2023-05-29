import { useAccount } from "wagmi";
import { useClipboard } from "@mantine/hooks";
import { useAppStates } from "~/contexts/AppStates";
import { useAuthentication } from "~/contexts/Authentication";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const ConnectButton = () => {
  const { address: addressWallet } = useAccount();
  const { setIsConnectOptionsOpened } = useAppStates();
  const { isConnected, isConnecting } = useAuthentication();
  const { copy, copied } = useClipboard();

  return (
    <Tooltip title={isConnected ? addressWallet! : "login to continue"}>
      <span>
        <Button
          disabled={isConnecting}
          variant="contained"
          size="small"
          color={copied ? "success" : undefined}
          onClick={() => {
            if (!isConnected) {
              setIsConnectOptionsOpened((prev) => !prev);
            } else {
              copy(addressWallet!);
            }
          }}
          sx={{ textTransform: "none", fontWeight: "bold", width: 160 }}
        >
          {isConnected ? "connected" : isConnecting ? "Connecting..." : "Login"}
        </Button>
      </span>
    </Tooltip>
  );
};

export default ConnectButton;
