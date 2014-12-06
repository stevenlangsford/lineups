setwd("exp/JDfaces/gae-minimal-exp/data/prepilot/")
library(ggplot2)
library(dplyr)

#read data
demo.dat<-read.csv("demographics.csv")
train.dat<-read.csv("train.csv")
test.dat<-read.csv("test.csv")

#Derived data

#responseCorrect (condition sensitive)
for(i in 1:nrow(test.dat)){
  response<-test.dat[i,"response"]
  correctans<-test.dat[i,"correctans"]
  condition<-test.dat[i,"condition"]
  
  if(response==correctans|
       response=="yes"&correctans>0|
       response=="no"&correctans==0){
    test.dat[i,"responseCorrect"]=TRUE
  }
  else if(correctans==0&condition=="mostlikely")test.dat[i,"responseCorrect"]=NA
  else test.dat[i,"responseCorrect"]=FALSE
}

#attach training display time to test response data
for(i in 1:nrow(train.dat)){
    myid<-train.dat[i,"idnumber"]
    mylineup<-train.dat[i,"lineup"]
   test.dat[which(test.dat$idnumber==myid&test.dat$lineup==mylineup),"displaytime"]<-train.dat[i,"displaytime"]
}
test.dat$displaytime<-ifelse(is.na(test.dat$displaytime),0,ifelse(test.dat$displaytime==500,1,2))
bob<-test.dat$displaytime

