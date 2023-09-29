namespace BackendQuizBot.Models;
public class Result
{
    public int Id { get; set; }
    public string TelegramId { get; set; }
    public int PassedExamCount { get; set; }
    public int SpentTime { get; set; }
    public DateTime Created { get; set; }
}