namespace BackendQuizBot.ViewModels;

public class UserAlsoCheckAnswerVM
{
    public string UserId { get; set; }
    public List<CheckAnswerVM> AnswerAndQuestions { get; set; }
    public DateTime SpentTime { get; set; }
}