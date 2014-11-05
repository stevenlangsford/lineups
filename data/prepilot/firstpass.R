library(dplyr)
library(tidyr)
demographics<-read.csv("demographics.csv")
training<-read.csv("train.csv")
test<-read.csv("test.csv")

#summary(demographics)
#summary(training)
#summary(test)

#whichfacecheck<-training%>%
#  group_by(idnumber,face)%>%
#  summarize(n=n())%>%ungroup()%>%
#  spread(face,n)

