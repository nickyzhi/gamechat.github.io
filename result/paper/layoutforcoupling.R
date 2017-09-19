getwd()
setwd("/Users/nickyzhi/Desktop/Research/InteractiveTextVisual/couplingStudyResult/")
deattach()
library(lme4)
lmm.data <- read.csv("preprocess2.tsv", header = TRUE, sep = "\t",stringsAsFactors=FALSE)
lmm.data$layout <- ifelse(lmm.data$storyid == 0 | lmm.data$storyid == 1,1,
                          ifelse(lmm.data$storyid == 2 | lmm.data$storyid == 3,2,
                                 ifelse(lmm.data$storyid == 4 | lmm.data$storyid == 5,3,
                                        100)))
lmm.data$coupling <- ifelse(lmm.data$storyid == 0 | lmm.data$storyid == 2 | lmm.data$storyid == 4,0,
                            ifelse(lmm.data$storyid == 1 | lmm.data$storyid == 3 | lmm.data$storyid == 5,1,
                                   100))
#which layout is best for adding interaction
layout1story <- lmm.data[which(lmm.data$storyid==1|lmm.data$storyid==0),]
attach(layout1story)


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