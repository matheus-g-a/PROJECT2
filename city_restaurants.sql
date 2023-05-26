-- Create RestaurantData table
CREATE TABLE RestaurantData (
  location VARCHAR(50) PRIMARY KEY,
  cuisine VARCHAR(50),
  price DECIMAL(10, 2),
  count INT
);

-- Create CityCoordinates table
CREATE TABLE CityCoordinates (
  city VARCHAR(50) PRIMARY KEY,
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  FOREIGN KEY (city) REFERENCES RestaurantData (location)
);

-- Create CityPopulation table
CREATE TABLE CityPopulation (
  city VARCHAR(50) PRIMARY KEY,
  population INT,
  FOREIGN KEY (city) REFERENCES RestaurantData (location)
);

