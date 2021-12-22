/**
 * @file Player.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

// import PlayerPath from "./Path/PlayerPath";

// import ClickIndicator from "./ClickVisuals";

import Vehicle from '@/components/Vehicle';

// import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useVehicleControls } from '@/hooks/useVehicleControls';

import styles from './Player.module.css';

const Player = ({
  selectedVertex,
  mode,
  player,
  setGauges,
  currentDNA,
  time,
  obstacles = [],
  useAICar,
  quality = 3,
}) => {
  const playerRef = useRef(player);

  const chassisRef = useRef();
  const followCameraRef = useRef();
  const vehicleRef = useRef();

  useSubscriptions(playerRef, chassisRef);

  useVehicleControls(
    chassisRef,
    vehicleRef,
    playerRef,
    mode,
    setGauges,
    selectedVertex,
    currentDNA,
    useAICar,
  );

  React.useEffect(() => {
    playerRef.current = player;
    player.followCam = followCameraRef.current;
  }, [player, followCameraRef]);

  return (
    <>
      <Vehicle
        playerRef={playerRef}
        chassisRef={chassisRef}
        vehicleRef={vehicleRef}
        followCameraRef={followCameraRef}
        position={[147.5, 4, 192.5]}
        angularVelocity={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        time={time}
        obstacles={obstacles}
        quality={quality}
      />
      {/* <PlayerPath player={player} /> */}
      {/* <ClickIndicator selectedVertex={selectedVertex} /> */}
    </>
  );
};

Player.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default Player;
