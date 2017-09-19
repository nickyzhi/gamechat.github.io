getwd()
setwd("/Users/nickyzhi/Desktop/Research/InteractiveTextVisual/couplingStudyResult/")

library(lme4)
lmm.data <- read.csv("preprocess2.tsv", header = TRUE, sep = "\t",stringsAsFactors=FALSE)
lmm.data$layout <- ifelse(lmm.data$storyid == 0 | lmm.data$storyid == 1,1,
                             ifelse(lmm.data$storyid == 2 | lmm.data$storyid == 3,2,
                                    ifelse(lmm.data$storyid == 4 | lmm.data$storyid == 5,3,
                                           100)))
lmm.data$coupling <- ifelse(lmm.data$storyid == 0 | lmm.data$storyid == 2 | lmm.data$storyid == 4,0,
                          ifelse(lmm.data$storyid == 1 | lmm.data$storyid == 3 | lmm.data$storyid == 5,1,
                                        100))
attach(lmm.data)

marginError <- function(dataset){
  n <- length(dataset)
  s <- sd(dataset)
  margin <- qnorm(0.975)*s/sqrt(n)
  return (margin)
}

#overview analysis
mean(lmm.data$switchinteraction[which(storyid==0)])
mean(lmm.data$switchinteraction[which(storyid==1)])
mean(lmm.data$switchinteraction[which(storyid==2)])
mean(lmm.data$switchinteraction[which(storyid==3)])
mean(lmm.data$switchinteraction[which(storyid==4)])
mean(lmm.data$switchinteraction[which(storyid==5)])

marginError(lmm.data$switchinteraction[which(storyid==0)])
marginError(lmm.data$switchinteraction[which(storyid==1)])
marginError(lmm.data$switchinteraction[which(storyid==2)])
marginError(lmm.data$switchinteraction[which(storyid==3)])
marginError(lmm.data$switchinteraction[which(storyid==4)])
marginError(lmm.data$switchinteraction[which(storyid==5)])



#filter storyTime and engTime
lmm.data.filter <- lmm.data[which(storyTime>200 & engTime>25),]


#wilcox test
wilcox.test(lmm.data$comScore ~ lmm.data$comTime, data=lmm.data )

#does adding coupling interaction help?
#on eng
engInter.model = lmer(engScore ~ coupling + (1|sex)+(1|engTime)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(engInter.model)
engInter.null = lmer(engScore ~ (1|sex)+(1|engTime)+ (1|age)+ (1|storyid), REML=FALSE)
anova(engInter.null,engInter.model)
#com
comInter.model = lmer(comScore ~ coupling + (1|sex)+(1|comTime)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(comInter.model)
comInter.null = lmer(comScore ~ (1|sex)+(1|comTime)+ (1|age)+ (1|storyid), REML=FALSE)
anova(comInter.null,comInter.model)
#recall
recallInter.model = lmer(recallScore ~ coupling + (1|sex)+(1|recallTime)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(recallInter.model)
recallInter.null = lmer(recallScore ~ (1|sex)+(1|recallTime)+ (1|age)+ (1|storyid), REML=FALSE)
anova(recallInter.null,recallInter.model)
#after com con
#aftercom
aftercomInter.model.con = lmer(aftercomScoreCon ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(aftercomInter.model.con)
aftercomInter.null.con = lmer(aftercomScoreCon ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(aftercomInter.null.con,aftercomInter.model.con)

aftercomInter.model.eas = lmer(aftercomScoreEas ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(aftercomInter.model.eas)
aftercomInter.null.eas = lmer(aftercomScoreEas ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(aftercomInter.null.eas,aftercomInter.model.eas)
#afterrecall
afterrecallInter.model.con = lmer(afterrecallScoreCon ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(afterrecallInter.model.con)
afterrecallInter.null.con = lmer(afterrecallScoreCon ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(afterrecallInter.null.con,afterrecallInter.model.con)

afterrecallInter.model.eas = lmer(afterrecallScoreEas ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(afterrecallInter.model.eas)
afterrecallInter.null.eas = lmer(afterrecallScoreEas ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(afterrecallInter.null.eas,afterrecallInter.model.eas)
#time
storyTime.model = lmer(storyTime ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(storyTime.model)
storyTime.null = lmer(storyTime ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(storyTime.null,storyTime.model)

surveyTime.model = lmer(surveyTime ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(surveyTime.model)
surveyTime.null = lmer(surveyTime ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(surveyTime.null,surveyTime.model)

comBackTime.model = lmer(comBackTime ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(comBackTime.model)
comBackTime.null = lmer(comBackTime ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(comBackTime.null,comBackTime.model)

#interaction
textinteraction.model = lmer(textinteraction ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(textinteraction.model)
textinteraction.null = lmer(textinteraction ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(textinteraction.null,textinteraction.model)

visoverinteraction.model = lmer(visoverinteraction ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(visoverinteraction.model)
visoverinteraction.null = lmer(visoverinteraction ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(visoverinteraction.null,visoverinteraction.model)

switchinteraction.model = lmer(switchinteraction ~ coupling + (1|sex)+ (1|age)+ (1|storyid) ,REML=FALSE)
summary(switchinteraction.model)
switchinteraction.null = lmer(switchinteraction ~ (1|sex)+ (1|age)+ (1|storyid), REML=FALSE)
anova(switchinteraction.null,switchinteraction.model)

#how different layouts affect?
#on eng
engInter.model = lmer(engScore ~ layout + (1|sex)+(1|engTime)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(engInter.model)
engInter.null = lmer(engScore ~ (1|sex)+(1|engTime)+ (1|age)+ (1|coupling), REML=FALSE)
anova(engInter.null,engInter.model)
#com
comInter.model = lmer(comScore ~ layout + (1|sex)+(1|comTime)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(comInter.model)
comInter.null = lmer(comScore ~ (1|sex)+(1|comTime)+ (1|age)+ (1|coupling), REML=FALSE)
anova(comInter.null,comInter.model)
#recall
recallInter.model = lmer(recallScore ~ layout + (1|sex)+(1|recallTime)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(recallInter.model)
recallInter.null = lmer(recallScore ~ (1|sex)+(1|recallTime)+ (1|age)+ (1|coupling), REML=FALSE)
anova(recallInter.null,recallInter.model)
#after com con
#aftercom
aftercomInter.model.con = lmer(aftercomScoreCon ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(aftercomInter.model.con)
aftercomInter.null.con = lmer(aftercomScoreCon ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(aftercomInter.null.con,aftercomInter.model.con)

aftercomInter.model.eas = lmer(aftercomScoreEas ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(aftercomInter.model.eas)
aftercomInter.null.eas = lmer(aftercomScoreEas ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(aftercomInter.null.eas,aftercomInter.model.eas)
#afterrecall
afterrecallInter.model.con = lmer(afterrecallScoreCon ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(afterrecallInter.model.con)
afterrecallInter.null.con = lmer(afterrecallScoreCon ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(afterrecallInter.null.con,afterrecallInter.model.con)

afterrecallInter.model.eas = lmer(afterrecallScoreEas ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(afterrecallInter.model.eas)
afterrecallInter.null.eas = lmer(afterrecallScoreEas ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(afterrecallInter.null.eas,afterrecallInter.model.eas)
#time
storyTime.model = lmer(storyTime ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(storyTime.model)
storyTime.null = lmer(storyTime ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(storyTime.null,storyTime.model)

surveyTime.model = lmer(surveyTime ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(surveyTime.model)
surveyTime.null = lmer(surveyTime ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(surveyTime.null,surveyTime.model)

comBackTime.model = lmer(comBackTime ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(comBackTime.model)
comBackTime.null = lmer(comBackTime ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(comBackTime.null,comBackTime.model)

#interaction
textinteraction.model = lmer(textinteraction ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(textinteraction.model)
textinteraction.null = lmer(textinteraction ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(textinteraction.null,textinteraction.model)

visoverinteraction.model = lmer(visoverinteraction ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(visoverinteraction.model)
visoverinteraction.null = lmer(visoverinteraction ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(visoverinteraction.null,visoverinteraction.model)

switchinteraction.model = lmer(switchinteraction ~ layout + (1|sex)+ (1|age)+ (1|coupling) ,REML=FALSE)
summary(switchinteraction.model)
switchinteraction.null = lmer(switchinteraction ~ (1|sex)+ (1|age)+ (1|coupling), REML=FALSE)
anova(switchinteraction.null,switchinteraction.model)

#which layout is best for adding interaction
layout1story <- lmm.data[which(storyid==0|storyid==1),]

barplot(visoverinteraction, storyid)
boxplot(lmm.data.filter$visoverinteraction ~ lmm.data.filter$storyid)




engInter.model.filter = lmer(lmm.data.filter$engScore ~ lmm.data.filter$coupling + (1|lmm.data.filter$sex)+(1|lmm.data.filter$engTime)+ (1|lmm.data.filter$age)+ (1|lmm.data.filter$storyid) ,REML=FALSE)
summary(engInter.model.filter)
engInter.null.filter = lmer(engScore ~ (1|lmm.data.filter$sex)+(1|lmm.data.filter$engTime)+ (1|lmm.data.filter$age)+ (1|lmm.data.filter$storyid), REML=FALSE)
anova(engInter.null,engInter.model)

recallInter.model.filter = lmer(lmm.data.filter$recallScore ~ lmm.data.filter$coupling + (1|lmm.data.filter$sex)+(1|lmm.data.filter$recallTime)+ (1|lmm.data.filter$age)+ (1|lmm.data.filter$storyid) ,REML=FALSE)
summary(recallInter.model.filter)
recallInter.null.filter = lmer(recallScore ~ (1|lmm.data.filter$sex)+(1|lmm.data.filter$recallTime)+ (1|lmm.data.filter$age)+ (1|lmm.data.filter$storyid), REML=FALSE)
anova(recallInter.null,recallInter.model)

comInter.model.filter = lmer(lmm.data.filter$comScore ~ lmm.data.filter$coupling + (1|lmm.data.filter$sex)+(1|lmm.data.filter$comTime)+ (1|lmm.data.filter$age)+ (1|lmm.data.filter$storyid) ,REML=FALSE)
summary(comInter.model.filter)
comInter.null.filter = lmer(comScore ~ (1|lmm.data.filter$sex)+(1|lmm.data.filter$comTime)+ (1|lmm.data.filter$age)+ (1|lmm.data.filter$storyid), REML=FALSE)
anova(comInter.null,comInter.model)

#draw multiple box plot
boxplot(engScore ~ coupling, col=c("white","lightgray"))
switchinteraction
mean(switchinteraction[which(layout==3)])
boxplot(switchinteraction ~ layout)

mydata <- lmm.data
story0 <- subset(mydata, storyid == "0")
story1 <- subset(mydata, storyid == "1")
story2 <- subset(mydata, storyid == "2")
story3 <- subset(mydata, storyid == "3")
story4 <- subset(mydata, storyid == "4")
story5 <- subset(mydata, storyid == "5")
t.test(story4$switchinteraction,story5$switchinteraction)
