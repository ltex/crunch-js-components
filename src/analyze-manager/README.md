# Analyze Refactor Proposal

> AnalyzeState feature, that contains the FSM, which may be interacted with by the other pieces, play controller, variables, etc.
> And into the AnalyzeState is injected services for working on the data, checking consistency telling us whether something is univariate, etc.
> These functions may divide along meaningful boundaries and can be subdivided into more than one service. So my planned approach right now is to

* 1) split the analyze context manager into the aforementioned AnalyzeState and a service for performing analyze specific functions.
* 2) determine where those functions fit along logical domains, and potentially get us more than one injectable service here, and
* 3) modify play controller, variables, bivariate, and apply analysis to work specifically through the FSM via handle().

## Notes

> Through the course of this the "manager" name can be dropped and we can write specific tests for each component.
> Estimated time: 2 days

