using System;
using System.IO;
using System.Text;

namespace DataReaderForApocalypse
{
    class Program
    {
        static void Main(string[] args)
        {
            
            string path_1 = @"null";
            string path_1_1 = @"null";
            
            StreamReader r = new StreamReader(path_1, Encoding.Default);
            StreamWriter w = new StreamWriter(path_1_1, false, Encoding.Default);
            
            string[] arr = new string[100];

            string line;
            bool finded;
            
            // 2
            for (int i = 0; (line = r.ReadLine()) != null;)
            {
                finded = false;
                line = line.Replace(";", ",");

                foreach (var simillar in arr)
                {
                    if (simillar == line) finded = true;
                }

                if (!finded)
                {
                    arr[i] = line;
                    i++;
                }
            }

            Array.Sort(arr);
            
            w.WriteLine("let characters = [");
            foreach (var a in arr)
            {
                if (a != null)
                {
                    w.WriteLine($"\t{a}");
                    Console.WriteLine(a);
                }
            }
            w.WriteLine("\n]");
            
            Console.WriteLine("Done!");
            
            w.Close();
        }
    }
}