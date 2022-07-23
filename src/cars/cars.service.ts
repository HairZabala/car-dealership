import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { CARS_SEED } from 'src/seed/data/cars.seed';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  finAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const { brand, model } = createCarDto;
    const car: Car = {
      id: uuid(),
      brand,
      model,
    };

    this.cars.push(car);
    return car;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  populateSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
