using BackendQuizBot.Models;

namespace BackendQuizBot.ViewModels;

public class QuestionWithAnswerVM
{
    public string QuestionDescription { get; set; }
    public int QuestionId { get; set; }
    public List<OnlyAnswerVM> Answers { get; set; }
}