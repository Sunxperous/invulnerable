// This is a modified sketch and hack of code
// of ESP8266, Wifi and MPU-6050 for Mobile Sensing, 
// SIA App challenge.

// SIA App Challenge
// Team Vulnerable
// Credit: MPU6050 - JohnChi
// ESP8266-Arduino: From Github
// MPU-6050 Short Example Sketch
// By Arduino User JohnChi
// August 17, 2014
// Public Domain

#include<Wire.h>
#include <ESP8266WiFi.h>
#include <WiFiServer.h>
#include <ESP8266WebServer.h>
#include <math.h>
#include <algorithm>

#define OLED_SDA 4
#define OLED_SCL 5

#define ACC_SIZE 5

const char *SSID = "Dongle";
const int MPU=0x68;  // I2C address of the MPU-6050
int16_t AcX,AcY,AcZ,Tmp,GyX,GyY,GyZ;
ESP8266WebServer server(80);

// for the median filter stuff
int curr = 0;
int16_t mags[ACC_SIZE];
int16_t mag;

void setup_wifi() {
   delay(1000);
   WiFi.softAP(SSID);
   IPAddress myIp = WiFi.softAPIP();
   Serial.print("AP IP Address:");
   Serial.println(myIp);
   server.on("/", handle_root);
   server.begin();
}

void handle_root() {
  String response = String("{magnitude:") + mag + String("}");
  server.send(200, "application/json", response);
}

void setup(){
  Serial.begin(9600);
  Wire.begin(OLED_SDA, OLED_SCL);
  Wire.beginTransmission(MPU);
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     // set to zero (wakes up the MPU-6050)
  Wire.endTransmission(true);
  setup_wifi();
}

int16_t calc_avg() {
    int16_t acc;
    for (uint16_t i = 0; i < ACC_SIZE; i++) {
        acc += mags[i];
    }
    return acc / ACC_SIZE;
}

void loop(){
  server.handleClient();

  Wire.beginTransmission(MPU);
  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(false);
  Wire.requestFrom(MPU,14,true);  // request a total of 14 registers
  int16_t x = Wire.read()<<8|Wire.read();  // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  int16_t y = Wire.read()<<8|Wire.read();  // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  int16_t z = Wire.read()<<8|Wire.read();  // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  Tmp=Wire.read()<<8|Wire.read();  // 0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
  GyX=Wire.read()<<8|Wire.read();  // 0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)
  GyY=Wire.read()<<8|Wire.read();  // 0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
  GyZ=Wire.read()<<8|Wire.read();  // 0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)

  mags[curr] = sqrt(
          x * x +
          y * y +
          z * z
          );
  curr = (curr + 1) % ACC_SIZE;
  mag = pow(calc_avg(curr), 2);
  Serial.println(mag);
  delay(333);
}
