namespace BackendQuizBot.Models;
public class Result
{
    public int Id { get; set; }
    public string TelegramId { get; set; }
    public int PassedExamCount { get; set; }
    public DateTime Created { get; set; }
}