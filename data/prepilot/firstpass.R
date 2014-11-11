library(dplyr)
library(tidyr)

demographics<-read.csv("demographics.csv")
training<-read.csv("train.csv")
testing<-read.csv("test.csv")

for(sid in unique(training$idnumber)){
  targtests<-testing[testing$idnumber==sid,] 
  for(i in 1:nrow(training)){
    training[i,"testwants"]<-targtests[targtests$lineup==training[i,"lineup"],"correct"]
  }
}