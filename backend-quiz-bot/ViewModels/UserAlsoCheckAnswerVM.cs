namespace BackendQuizBot.ViewModels;

public class UserAlsoCheckAnswerVM
{
    public long UserId { get; set; }
    public List<CheckAnswerVM> AnswerAndQuestions { get; set; }
    public int SpentTime { get; set; }
}