export type Room = {
  temperature: number;
  light: number;
  occupancy: number;
  co2: number;
};
export const defaultRoom: Room = {
  temperature: 25,
  light: 450,
  occupancy: 12,
  co2: 650,
};
export function decideRoom(room: Room) {
  return {
    fan: room.occupancy > 0 && room.temperature > 27,
    lights: room.occupancy > 0 && room.light < 300,
    ventilation: room.co2 > 1000,
  };
}
