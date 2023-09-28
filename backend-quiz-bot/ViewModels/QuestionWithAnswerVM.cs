using BackendQuizBot.Models;

namespace BackendQuizBot.ViewModels;

public class QuestionWithAnswerVM
{
    public string QuestionDescription { get; set; }
    public int QuestionId { get; set; }
    public List<Answer> Answers { get; set; }
}