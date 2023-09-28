namespace BackendQuizBot.ViewModels;

public class OnlyAnswerVM
{
    public int Id { get; set; }
    public string Description { get; set; }
    public bool IsTrue { get; set; }
    public int QuestionId { get; set; }
}