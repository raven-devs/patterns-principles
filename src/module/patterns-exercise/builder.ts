// npx ts-node src/module/patterns-exercise/builder.ts

class House {
  floor: string;
  walls: string;
  windows: string;
  doors: string;
  roof: string;

  public toString() {
    return `floor: ${this.floor}, walls: ${this.walls}, roof: ${this.roof}, windows: ${this.windows}, doors: ${this.doors}`;
  }
}

class HouseBuilder {
  private _house: House;

  constructor() {
    this.reset();
  }

  private reset() {
    this._house = new House();
  }

  public done() {
    const house = this._house;
    this.reset();
    return house;
  }

  public setFloor(floor: string) {
    this._house.floor = floor;
    return this;
  }

  public setWalls(walls: string) {
    this._house.walls = walls;
    return this;
  }

  public setRoof(roof: string) {
    this._house.roof = roof;
    return this;
  }

  public setWindows(windows: string) {
    this._house.windows = windows;
    return this;
  }

  public setDoors(doors: string) {
    this._house.doors = doors;
    return this;
  }
}

class HouseBuilderDirector {
  constructor(private houseBuilder: HouseBuilder) {}

  buildStandardHouse() {
    return this.houseBuilder
      .setFloor('floor standard')
      .setWalls('walls standard')
      .setRoof('roof standard')
      .setDoors('doors standard')
      .setWindows('windows standard')
      .done();
  }

  buildPremiumHouse() {
    return this.houseBuilder
      .setFloor('floor premium')
      .setWalls('walls premium')
      .setRoof('roof premium')
      .setDoors('doors premium')
      .setWindows('windows premium')
      .done();
  }
}

function main() {
  const houseBuilder = new HouseBuilder();

  // object creation steps are defined by a client (order of the steps can be wrong, some required steps could be missing)
  const house1 = houseBuilder.setDoors('doors1').setFloor('floor1').setRoof('roof1').done();
  console.log('house1', house1.toString());

  const house2 = houseBuilder.setFloor('floor1').setWalls('walls2').done();
  console.log('house2', house2.toString());

  // object creation steps are fully controlled by the director class
  const houseBuilderDirector = new HouseBuilderDirector(houseBuilder);

  const houseStandard = houseBuilderDirector.buildStandardHouse();
  console.log('houseStandard', houseStandard.toString());

  const housePremium = houseBuilderDirector.buildPremiumHouse();
  console.log('housePremium', housePremium.toString());
}

main();

export {};
